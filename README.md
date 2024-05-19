## About the application

The application uses Nestjs framework to perform different operations on category, subcategory, items for e commerce applications.

## Installation 

The project uses the following tools.

- ```Nest JS framework```: A progressive backend framework built on top of Node JS.
- ```mongoose```: A node js based library to interact with mongo db database.
- ```mongodb```: A popular Nosql database. [compass for initial testing, recommended to use mongodb atlas]
- ```Husky```: To configure precommit hooks, consistent commits etc. 
- ```Ci Cd pipleine```: Automated workflow using github actions/workflow. 
- ```Prettier and eslint configurations```: Tool to configure the codes and make it consistent. 
- ```yarn package maanger```: A package manager with better performance compared to npm.
- ```docker```: Docker is a containerization platform to deploy software applications.


## How to run the code

- First clone the repository:
  ```bash
  git clone https://github.com/asifrahaman13/dreamer-dolphin.git
  ```

- Next move on to the dreamer dolphin repository.
  ```bash
  cd dreamer-dolphin/
  ```

- Next install the dependencies. 
  ```bash
  $ yarn install
  ```

create an env variable file. 

```bash
mv .env.example .env
```


## Running the app

- ```bash
  # development
  $ yarn run start

  # watch mode
  $ yarn run start:dev

  # production mode
  $ yarn run start:prod
    ```

## Running as docker container

- Follow the steps in case you want to run the application as a docker container:
  ```bash
  docker build -t dreamer-dolphin:latest .
  ```
- Rn the docker container:
  ```bash 
  docker run -p 5000:5000 dreamer-dolphin:latest
  ```

**Note: Please use mongodb atlas in case you are running on docker container. Using local host may throw erro in that case.**