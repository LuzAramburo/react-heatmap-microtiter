# react-heatmap-microtiter
Web application to load data from a 1536-well microtiter plate and visualize the data as a heatmap.

# Example files
`data` folder on root contains 2 example files for testing

# Developing
```shell
docker compose up --build
```
Navigate to http://localhost:5173. The Docker container will run your server and client in development mode.

# Building
```shell
docker build . -t react-heatmap:dev
```

```shell
docker run -p 5173:5173 react-heatmap:dev
```
