<div align="center"><h1>Email Builder</h1></div>

<div align="center">This project is a part of: <b><a href="">Voltigo</a></b></div>
<div align="center">This project is based on: <b><a href="https://github.com/zalify/easy-email-editor">Easy Email</a></b></div>


## Description

As the name suggests this project is used for building Emails that are going to be sent with job applications. The original code
has been adjusted to the needs of <b><a href="">Voltigo</a></b>. Some parts of the project were removed, some changed, some
are completely new etc.

Around 95% of the code is still the original <b><a href="https://github.com/zalify/easy-email-editor">Easy Email</a></b>.
Since It was not planned to learn React etc. many of the custom-made solutions are most likely non-react friendly at all.

# Running the project

- go inside the `docker/prod` directory,
- call `docker-compose up -d`,
- the project is now reachable under `http://12.9.1.6`

## Known issues 

- `Error: The following dependencies are imported but could not be resolved:`
- *Removing `node_modules` folder helped* 
