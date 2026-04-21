const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const verificarToken = require('./middleware/verificarToken');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.jwtSecret || process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('JWT secret no definido en .env');
}
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);

app.use(express.json());
app.use(cors());

app.post('/api/registro', async (req, res) => {
  try {
    const { nombre, email, password} = req.body;

    // Verificar si el usuario ya existe
    const { data: usuarioExistente } = await supabase
      .from('Usuarios')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    const { data, error } = await supabase
      .from('Usuarios')
      .insert([{ nombre, email, password: hashedPassword }])
      .select();

    if (error) throw error;

    res.status(201).json({ user: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



app.get('/', (req, res) => {
  res.send('Bienvenidos a mi API desplegada en Render');
});

app.get('/saludo', verificarToken, async (req, res) => {
  const usuario = req.usuario; // El usuario verificado por el middleware
  res.json({ saludo: 'Hola, este es un saludo desde mi API', usuario });
});

//Crea un nuevo proyecto en Supabase
app.post('/api/proyectos/create',async (req, res) => {
  try {
    const {data, error} = await supabase
      .from('Proyectos')
      .insert([req.body])
      .select();
    if (error) throw error;

    console.log(data)
    res.status(201).json({ proyecto: data[0] });


      } catch (error) {
    res.status(400).json({ error: error.message });

  }

});

//login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const { data: usuario, error: errFind } = await supabase
      .from('Usuarios')
      .select('id, nombre, email, password')
      .eq('email', email)
      .maybeSingle();

    if (errFind) {
      console.error('Supabase login error:', errFind);
      throw errFind;
    }

    if (!usuario) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({ error: 'JWT secret no configurado en el servidor' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message || 'Error en login' });
  }
});


// Obtiene TODOS los proyectos desde Supabase
app.get('/api/proyectos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Proyectos')
      .select(`
        id,
        nombre,
        descripcion,
        created_at,
        link,
        proyecto_tags (
          tags (
            id,
            nombre
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Opcional: "Limpiar" la respuesta para que los tags sean un array simple
    const proyectosFormateados = data.map(proyecto => ({
      ...proyecto,
      tags: proyecto.proyecto_tags.map(pt => pt.tags.nombre_tag)
    }));

    res.status(200).json(proyectosFormateados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//busca el proyecto por ID
app.get('/api/proyectos/:id', async (req, res) => {
  try {
    const {data, error} = await supabase
      .from('Proyectos')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    res.status(200).json({ proyectos: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Elimina un proyecto por ID
app.delete('/api/proyectos/:id', async (req, res) => {
  try {
    const {data, error} = await supabase
      .from('Proyectos')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Proyecto eliminado', proyectos: data });
    res.status(200).json({ proyectos: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.put('/api/proyectos/:id', async (req, res) => {
  try {
    const {data, error} = await supabase
      .from('Proyectos')
      .update(req.body)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.status(200).json({ proyecto: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Obtiene repositorios de GitHub con token para evitar rate limit
app.get('/api/repos', async (req, res) => {
  try {
    const headers = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'portafolio-Wilkerylr',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const response = await fetch(
      'https://api.github.com/users/Wilkerylr/repos?sort=updated&per_page=30',
      { headers }
    );
    if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
