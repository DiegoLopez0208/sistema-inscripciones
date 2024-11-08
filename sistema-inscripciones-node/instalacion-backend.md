# instalacion

Como requisitos para este proyecto, tienen que tener instalado *Node.js*, que nos permite ejecutar código JavaScript, y *Bun* que será nuestro manejador de dependencias.

<h2>Paso 1 instalar node</h2>

- instalar node desde windonw la version 20.16.0(LTS) solo le dan al boton descargar y seguir los pasos de la instalacion [visia node](https://nodejs.org/en)

- instalar node desde linux 20.16.0(LTS) [visia node](https://nodejs.org/en/download/package-manager)

instalar por consola (linux)

```bash
# installs fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash

# activate fnm
source ~/.bashrc

# download and install Node.js
fnm use --install-if-missing 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.16.0`
```

<h2>Paso 2 instalar bun</h2>

link por si quieren ver la documentacion de instalacion por si hay dudas  [visia bun](https://bun.sh/docs/installation)

linux

```bash
# installs fnm (Fast Node Manager)
curl -fsSL https://bun.sh/install | bash # for macOS, Linux, and WSL

#Checking installation
bun --version
# este comando actualiiza bun a una version estable
bun upgrade --stable
```

windows

```bash
powershell -c "irm bun.sh/install.ps1|iex"
#Bun requires a minimum of Windows 10 version 1809

#Checking installation
bun --version
# este comando actualiiza bun a una version estable
bun upgrade --stable
```

## Paso 3: Clonar el repositorio

Ahora lo que nos faltaría es traer el proyecto a nuestra máquina e instalar las dependencias que tiene el proyecto hasta el momento.

```bash
# verifiquemos que tengamos git 
git --version

# en linux
sudo apt install git

```

en windows [visia git y descarguelo desde ahi](https://git-scm.com/download/win)

```bash
# clonamos el repositorio a nuestra maquina
git clone https://gitlab.com/sistema-de-gestion-de-inscripciones/sistema-inscripciones-node.git
```

una vez dentro del proyecto usamos un comando para instalar las dependencias

```bash
# instala dependencies, devDependencies (pakage.json)
bun install

```
<h2> comando basico para instalar de pendencias</h2>

```bash
# agrega dependencias
bun add pakage
# remueve dependencias
bun remove pakage
# actualiza dependencias
bun update package
```
