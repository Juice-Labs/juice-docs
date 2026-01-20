// src/data/compatibleApps.js

export const compatibleApps = [
  {
    name: '3DMark',
    category: 'GPU Benchmarking',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Most benchmarks work, but certain tests like Steel Nomad are currently incompatible.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/3dmark'
  },
  {
    name: 'Adobe After Effects',
    category: 'VFX & Compositing',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. Contact our support team to request prioritization for this application.'
  },
  {
    name: 'Aimtastic',
    category: 'Gaming',
    versions: ['Latest'],
    status: 'Community Tested',
    os: ['Windows'],
    notes: 'Latest version on Steam. Reported to work well with Juice.'
  },
  {
    name: 'AnythingLLM',
    category: 'AI / LLM Tools',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Private AI desktop app. Can use Ollama as a backend.'
  },
  {
    name: 'ArcGIS Pro',
    category: 'GIS',
    versions: ['3.3'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Geographic information system software for working with maps and geographic information.',
  },
  {
    name: 'Autodesk 3ds Max',
    category: '3D Modeling & Animation',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. Contact our support team to request prioritization for this application.'
  },
  {
    name: 'Autodesk AutoCAD',
    category: 'CAD / Drafting',
    versions: ['2026'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Professional 2D and 3D CAD software for architecture, engineering, and construction.'
  },
  {
    name: 'Autodesk Maya',
    category: '3D Modeling & Animation',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
    },
    {
    name: 'Autodesk Revit',
    category: 'BIM / Architecture',
    versions: ['2026'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'BIM software for architecture, engineering, and construction.'
  },
  {
    name: 'Blender',
    category: '3D Modeling',
    versions: ['4.5'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Cycles and EEVEE render.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/blender'
  },
  {
    name: 'ComfyUI',
    category: 'AI Image Generation',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'A powerful and modular node-based GUI for Stable Diffusion.',
    docLink: '/docs/juice/user-guide/juice-for-compute/comfyui'
  },
  {
    name: 'Cyberpunk 2077',
    category: 'Gaming',
    versions: ['Latest'],
    status: 'Community Tested',
    os: ['Windows'],
    notes: 'Latest version on GOG & Steam.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/cyberpunk-2077'
  },
  {
    name: 'Daz Studio',
    category: '3D Modeling & Animation',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
  },
  {
    name: 'DOOM',
    category: 'Gaming',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Latest version on Steam.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/doom'
  },
    {
    name: 'Enscape',
    category: 'Real-time rendering and virtual reality plugin',
    versions: ['3.5.3', '4.0.2', 'Latest'],
    status: 'In Progress',
    os: ['Windows', 'Linux'],
    notes: 'Curently being worked on by the Juice team.',

  },
  {
    name: 'GPT4All',
    category: 'AI / LLM Tools',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'A free-to-use, locally running, privacy-aware chatbot that requires no GPU.',
    docLink: '/docs/juice/user-guide/juice-for-compute/gpt4all'
  },
  {
    name: 'Houdini (Command Line)',
    category: 'VFX & Compositing',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Command-line tools (e.g., hython, hscript) work correctly with the Redshift rendering plugin.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/redshift'
  },
  {
    name: 'Jupyter Notebook',
    category: 'Developer Tools',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Web-based interactive computing notebook for code, data, and visualizations.',
    docLink: '/docs/juice/user-guide/juice-for-compute/jupyterlab'
  },
  {
    name: 'KeyShot',
    category: '3D Rendering',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
    },
  {
    name: 'MATLAB',
    category: 'Scientific Computing',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'A programming and numeric computing platform used by engineers and scientists.'
  },
  {
    name: 'Maxon Cinema 4D',
    category: '3D Modeling & Animation',
    versions: ['2026', '2025'],
    status: 'Known Issues',
    os: ['Windows', 'Linux'],
    notes: 'Performance may vary based on project complexity.'
  },
    {
    name: 'Maxon Redshift',
    category: '3D Rendering',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Performance may vary based on the project complexity.'
  },
  {
    name: 'Maxon ZBrush',
    category: 'Digital Sculpting',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Industry-standard digital sculpting and painting software.'
  },
  {
    name: 'Nuke Studio',
    category: 'VFX & Compositing',
    versions: ['16.0v4'], 
    status: 'Verified',
    os: ['Windows'],
    notes: 'Works out of the box. No special configuration needed.'
  },
  {
    name: 'OctaneBench',
    category: 'GPU Benchmarking',
    versions: ['2020.1.5'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Benchmark tool based on OctaneRender to test raw GPU performance.'
  },
  {
    name: 'OctaneBench',
    category: 'GPU Benchmarking',
    versions: ['2025.1.5'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: "Currently incompatible with Juice. The team is investigating potential solutions."
  },
  {
    name: 'Ollama',
    category: 'AI / LLM Tools',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Run large language models locally via command-line and API.',
    docLink: '/docs/juice/user-guide/juice-for-compute/ollama'
  },
  {
    name: 'Palworld',
    category: 'Gaming',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Latest version on Steam.'
  },
  {
    name: 'PyTorch',
    category: 'Machine Learning Framework',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'An open source machine learning framework for building and training neural networks.'
  },
  {
    name: 'Rhino 3D',
    category: 'CAD / 3D VModeling',
    versions: ['Rhino 7 and 8'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Most features work, but some rendering modes may have issues.'
  },
   {
    name: 'Roblox Studio',
    category: 'Game Development',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Create and publish 3D experiences and games on the Roblox platform.'
  },
  {
    name: 'Rocket League',
    category: 'Gaming',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Competitive vehicular soccer video game.'
  },
  {
    name: 'Sid Meier\'s Civilization VI',
    category: 'Gaming',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Latest version on Steam. Bestsupport with DirectX 12 mode.'
  },
  {
    name: 'Siemens NX CAD',
    category: 'CAD / CAM',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Juice provides support for Ray-traced studio within Siemens NX.'
  },
  {
    name: 'Stable Diffusion',
    category: 'AI Image Generation',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Core models for AI image generation. Often used with a front-end like ComfyUI.',
    docLink: '/docs/juice/user-guide/juice-for-compute/stable-diffusion'
  },
  {
    name: 'Steam',
    category: 'Gaming Platform',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'The leading digital distribution platform for PC gaming.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/steam'
  },
  {
    name: 'Topaz Gigapixel AI',
    category: 'AI Image Upscaling',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Upscale and enhance images with AI-powered technology.'
  },
  {
    name: 'Topaz Photo AI',
    category: 'AI Photo Editing',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Performance may vary based on project complexity.'
  },
  {
    name: 'Topaz Video AI',
    category: 'AI Video Enhancement',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
  },
  {
    name: 'Twinmotion',
    category: 'Real-time Visualization',
    versions: ['Latest'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
  },
  {
    name: 'UNIGINE Superposition',
    category: 'GPU Benchmarking',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows'],
    notes: 'Please ensure you select the DirectX API for this benchmark. OpenGL is not currently supported.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/superposition'
  },
  {
    name: 'Unity',
    category: 'Game Development',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'The Unity Editor works well for creating games and experiences.'
  },
  {
    name: 'Unreal Editor',
    category: 'Game Development',
    versions: ['5.6.1', '5.5.4', '5.4.4', '5.3.2', '5.2.1', '4.0.2'],
    status: 'Verified', 
    os: ['Windows'],
    notes: 'Works out of the box. No special configuration needed.'
  },
  {
    name: 'Unreal Editor',
    category: 'Game Development',
    versions: ['4.2.7'],
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Crashes on start.'
  },
  {
    name: 'Visual Studio Code',
    category: 'Developer Tools',
    versions: ['Latest'],
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Code editor with a rich ecosystem of extensions for many languages and runtimes.',
    docLink: '/docs/juice/user-guide/juice-for-compute/vscode'
  }
];

export const statusDefs = {
  'Verified': {
    description: 'Fully tested and confirmed by the Juice Labs team. ✅',
    color: '#2e8555'
  },
  'Community Tested': {
    description: 'Reported to work by Juice users, but not yet officially verified. 🧪',
    color: '#4169e1'
  },
  'In Progress': {
    description: 'Currently being worked on and tested by the Juice Labs team. 💡',
    color: '#d2980d'
  },
  'Known Issues': {
    description: 'Either does not work at all or works partially. ⚠️',
    color: '#b22222'
  }
};