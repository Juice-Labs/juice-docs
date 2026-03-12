// src/data/compatibleApps.js

export const compatibleApps = [
  {
    name: '3DMark',
    category: 'GPU Benchmarking',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Most benchmarks work, but certain tests like Steel Nomad are currently incompatible.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/3dmark'
  },
  {
    name: 'Adobe After Effects',
    category: 'VFX & Compositing',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. Contact our support team to request prioritization for this application.'
  },
  {
    name: 'Aimtastic',
    category: 'Gaming',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Basic Support',
    os: ['Windows'],
    notes: 'Latest version on Steam. Reported to work well with Juice.'
  },
  {
    name: 'AnythingLLM',
    category: 'AI / LLM Tools',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Private AI desktop app. Can use Ollama as a backend.'
  },
  {
    name: 'ArcGIS Pro',
    category: 'GIS',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Basic Support',
    os: ['Windows'],
    notes: 'Geographic information system software for working with maps and geographic information.',
  },
  {
    name: 'Autodesk 3ds Max',
    category: '3D Modeling & Animation',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. Contact our support team to request prioritization for this application.'
  },
  {
    name: 'Autodesk AutoCAD',
    category: 'CAD / Drafting',
    versions: ['2026'],
    lastVerified: '23.0.0-94',
    status: 'Verified',
    os: ['Windows'],
    notes: 'Professional 2D and 3D CAD software for architecture, engineering, and construction.'
  },
  {
    name: 'Autodesk Maya',
    category: '3D Modeling & Animation',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
  },
  {
    name: 'Autodesk Revit',
    category: 'BIM / Architecture',
    hidden: true, 
    versions: ['2026'],
    lastVerified: '28.0.0-47',
    status: 'Beta Support',
    os: ['Windows'],
    notes: 'BIM software for architecture, engineering, and construction.'
  },
  {
    name: 'Blender',
    category: '3D Modeling',
    versions: ['4.4', '4.5'],
    lastVerified: '28.0.0-47',
    status: 'Beta Support', 
    os: ['Windows', 'Linux'],
    notes: 'Occasional crashes reported (MESA swapchain error). Cycles and EEVEE rendering confirmed working.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/blender'
  },
  {
    name: 'ComfyUI',
    category: 'AI Image Generation',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'A powerful and modular node-based GUI for Stable Diffusion.',
    docLink: '/docs/juice/user-guide/juice-for-compute/comfyui'
  },
  {
    name: 'Cyberpunk 2077',
    category: 'Gaming',
    hidden: true,
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Verified',
    os: ['Windows'],
    notes: 'Latest version on GOG & Steam.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/cyberpunk-2077'
  },
  {
    name: 'Daz Studio',
    category: '3D Modeling & Animation',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
  },
  {
    name: 'DOOM',
    category: 'Gaming',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows'],
    notes: 'Latest version on Steam.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/doom'
  },
  {
    name: 'Enscape',
    category: 'Real-time rendering and virtual reality plugin',
    versions: ['3.5.3', '4.0.2', '4.8','Latest'],
    lastVerified: '28.0.0-47',
    status: 'In Progress',
    os: ['Windows', 'Linux'],
    notes: 'Curently being worked on by the Juice team.',
  },
  {
    name: 'GPT4All',
    category: 'AI / LLM Tools',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'A free-to-use, locally running, privacy-aware chatbot that requires no GPU.',
    docLink: '/docs/juice/user-guide/juice-for-compute/gpt4all'
  },
  {
    name: 'Houdini (Command Line)',
    category: 'VFX & Compositing',
    versions: ['20.5'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Command-line tools (e.g., hython, hscript) work correctly with the Redshift rendering plugin.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/redshift'
  },
  {
    name: 'Jupyter Notebook',
    category: 'Developer Tools',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Web-based interactive computing notebook for code, data, and visualizations.',
    docLink: '/docs/juice/user-guide/juice-for-compute/jupyterlab'
  },
  {
    name: 'KeyShot',
    category: '3D Rendering',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
  },
  {
    name: 'MATLAB',
    category: 'Scientific Computing',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'A programming and numeric computing platform used by engineers and scientists.'
  },
  {
    name: 'Maxon Cinema 4D',
    category: '3D Modeling & Animation',
    versions: ['2026', '2025'],
    lastVerified: '28.0.0-47',
    status: 'Beta Support',
    os: ['Windows', 'Linux'],
    notes: 'Performance may vary based on project complexity.'
  },
  {
    name: 'Maxon Redshift',
    category: '3D Rendering',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Performance may vary based on the project complexity.'
  },
  {
    name: 'Maxon ZBrush',
    category: 'Digital Sculpting',
    hidden: true,
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Basic Support',
    os: ['Windows'],
    notes: 'Industry-standard digital sculpting and painting software.'
  },
  {
    name: 'Nuke Studio',
    category: 'VFX & Compositing',
    versions: ['16.0v4'], 
    lastVerified: '28.0.0-47',
    status: 'Basic Support',
    os: ['Windows'],
    notes: 'Works out of the box. No special configuration needed.'
  },
  {
    name: 'OctaneBench',
    category: 'GPU Benchmarking',
    versions: ['2020.1.5'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows'],
    notes: 'Benchmark tool based on OctaneRender to test raw GPU performance.'
  },
  {
    name: 'OctaneBench',
    category: 'GPU Benchmarking',
    versions: ['2025.1.5'],
    lastVerified: '28.0.0-47',
    status: 'Known Issues',
    os: ['Windows'],
    notes: "Currently incompatible with Juice. The team is investigating potential solutions."
  },
  {
    name: 'Ollama',
    category: 'AI / LLM Tools',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Run large language models locally via command-line and API.',
    docLink: '/docs/juice/user-guide/juice-for-compute/ollama'
  },
  {
    name: 'Palworld',
    category: 'Gaming',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows'],
    notes: 'Latest version on Steam.'
  },
  {
    name: 'PyTorch',
    category: 'Machine Learning Framework',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'An open source machine learning framework for building and training neural networks.'
  },
  {
    name: 'Rhino 3D',
    category: 'CAD / 3D Modeling',
    hidden: true,
    versions: ['Rhino 7 and 8'],
    lastVerified: '28.0.0-47',
    status: 'Beta Support',
    os: ['Windows'],
    notes: 'Most features work, but some rendering modes may have issues.'
  },
  {
    name: 'Roblox Studio',
    category: 'Game Development',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Verified',
    os: ['Windows'],
    notes: 'Create and publish 3D experiences and games on the Roblox platform.'
  },
  {
    name: 'Rocket League',
    category: 'Gaming',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows'],
    notes: 'Competitive vehicular soccer video game.'
  },
  {
    name: 'Sid Meier\'s Civilization VI',
    category: 'Gaming',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Latest version on Steam. Best support with DirectX 12 mode.'
  },
  {
    name: 'Siemens NX CAD',
    category: 'CAD / CAM',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Beta Support',
    os: ['Windows'],
    notes: 'Juice provides support for Ray-traced studio within Siemens NX.'
  },
  {
    name: 'Stable Diffusion',
    category: 'AI Image Generation',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Core models for AI image generation. Often used with a front-end like ComfyUI.',
    docLink: '/docs/juice/user-guide/juice-for-compute/stable-diffusion'
  },
  {
    name: 'Steam',
    category: 'Gaming Platform',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows'],
    notes: 'The leading digital distribution platform for PC gaming.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/steam'
  },
  {
    name: 'Topaz Gigapixel AI',
    category: 'AI Image Upscaling',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Basic Support',
    os: ['Windows'],
    notes: 'Upscale and enhance images with AI-powered technology.'
  },
  {
    name: 'Topaz Photo AI',
    category: 'AI Photo Editing',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Beta Support',
    os: ['Windows'],
    notes: 'Performance may vary based on project complexity.'
  },
  {
    name: 'Topaz Video AI',
    category: 'AI Video Enhancement',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Known Issues',
    os: ['Windows'],
    notes: 'Currently incompatible with Juice. The team is investigating potential solutions.'
  },
  {
    name: 'Twinmotion',
    category: 'Real-time Visualization',
    versions: ['2024.1', '2025.1', '2025.2'],
    lastVerified: '28.0.0-47',
    status: 'In Progress',
    os: ['Windows', 'Linux'],
    notes: 'Curently being worked on by the Juice team.'
  },
  {
    name: 'UNIGINE Superposition',
    category: 'GPU Benchmarking',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Verified',
    os: ['Windows'],
    notes: 'Please ensure you select the DirectX API for this benchmark. OpenGL is not currently supported.',
    docLink: '/docs/juice/user-guide/juice-for-graphics/superposition'
  },
  {
    name: 'Unity',
    category: 'Game Development',
    versions: ['Latest'],
    lastVerified: '23.0.0-94',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'The Unity Editor works well for creating games and experiences.'
  },
  {
    name: 'Unreal Editor',
    category: 'Game Development',
    versions: ['5.6.1', '5.5.4', '5.4.4', '5.3.2', '5.2.1', '4.0.2'],
    lastVerified: '28.0.0-47',
    status: 'In Progress', 
    os: ['Windows', 'Linux'],
    notes: 'Curently being worked on by the Juice team.'
  },
  {
    name: 'Unreal Editor',
    category: 'Game Development',
    versions: ['4.2.7'],
    lastVerified: '28.0.0-47',
    status: 'Known Issues',
    os: ['Windows', 'Linux'],
    notes: 'Crashes on start.'
  },
  {
    name: 'Visual Studio Code',
    category: 'Developer Tools',
    versions: ['Latest'],
    lastVerified: '28.0.0-47',
    status: 'Verified',
    os: ['Windows', 'Linux'],
    notes: 'Code editor with a rich ecosystem of extensions for many languages and runtimes.',
    docLink: '/docs/juice/user-guide/juice-for-compute/vscode'
  }
];

export const statusDefs = {
  'Verified': { 
    color: '#2e7d32', 
    description: 'Fully tested and confirmed by the Juice team. ✅' 
  },
  'Beta Support': { 
    color: '#f59e0b', 
    description: 'Works with potential instabilities or version-specific bugs. 🧪' 
  },
  'Basic Support': { 
    color: '#4a90e2', 
    description: 'Verified for core functionality; in-depth testing is pending. 🧪' 
  },
  'In Progress': { 
    color: '#f6e05e', 
    description: 'Currently being worked on and tested by the Juice team. 💡' 
  },
  'Known Issues': { 
    color: '#e53e3e', 
    description: 'Either does not work at all or works partially. ⚠️' 
  },
};