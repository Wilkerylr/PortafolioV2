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

//Practica de registro de usuarios con hash de contraseña y verificación de existencia previa en Supabase
app.post('/api/registro', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

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
      .insert([{ nombre, email, password: hashedPassword, rol: rol || 'user' }])
      .select();

    if (error) throw error;

    res.status(201).json({ user: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Bienvenidos a mi API desplegada en Render');
});

// Ruta protegida que requiere token JWT para acceder
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
        email: usuario.email
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token, rol: 'admin' });
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
        imagen,
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
      tags: proyecto.proyecto_tags.map(pt => pt.tags.nombre)
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

// Actualiza un proyecto por ID
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

// Endpoint para obtener habilidades agrupadas por tipo
app.get('/api/skills', async (req, res) => {
  try {
    const { data: tiposData, error: errorTipos } = await supabase
      .from('tipo')
      .select(`
        id,
        nombre_tipo,
        tipos_tags (
          tags (nombre)
        )
      `)
      .order('id', { ascending: true });

    // 1. Agregamos 'descripcion' a la consulta de habilidades_tecnicas
    const { data: habilidadesData, error: errorHabs } = await supabase
      .from('habilidades_tecnicas')
      .select('nombre, categoria, descripcion'); 

    if (errorTipos || errorHabs) throw errorTipos || errorHabs;

    const respuestaFinal = tiposData.map(cat => {
      // Tags de proyectos (convertidos a objeto con descripción vacía para mantener consistencia)
      const tags = cat.tipos_tags.map(rel => ({
        name: rel.tags?.nombre,
        description: null 
      })).filter(t => t.name);
      
      // 2. Mapeamos las habilidades técnicas incluyendo su descripción
      const tecnicas = habilidadesData.filter(h => {
        const catHabilidad = h.categoria?.toLowerCase();
        const tituloTarjeta = cat.nombre_tipo.toLowerCase();

        if (tituloTarjeta === 'backend' || tituloTarjeta === 'frontend') {
          return catHabilidad === 'programación' || catHabilidad === 'programacion';
        }
        if (tituloTarjeta === 'electronica') {
          return catHabilidad === 'electrónica' || catHabilidad === 'electronica' || catHabilidad === 'sistemas/iot' || catHabilidad === 'seguridad/iot';
        }
        if (tituloTarjeta === 'herramientas') {
          return catHabilidad === 'herramientas';
        }
        return false;
      }).map(h => ({
        name: h.nombre,
        description: h.descripcion // <--- Aquí incluimos la nueva descripción
      }));

      return {
        title: cat.nombre_tipo,
        // Combinamos ambos y eliminamos duplicados por nombre
        allSkills: [...tags, ...tecnicas]
      };
    });

    res.status(200).json(respuestaFinal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
