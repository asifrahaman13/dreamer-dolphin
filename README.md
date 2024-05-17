## About the application

The application uses Nestjs framework to perform different operations on category, subcategory, items for e commerce applications. 

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

## Running as docker container

```bash
docker build -t dreamer-dolphin:latest .
```

```bash 
docker run -p 5000:5000 dreamer-dolphin:latest
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

Want to run the

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```