# Create Project root folder
mkdir loginApp-Client

# Initialize project configuration
yarn init -y

# Create two folders insing root directory
mkdir public
mkdir src

# install react, react-dom
yarn add react react-dom formik yup

# install webpack dev dependencies
yarn add --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin


# install Babel dev dependencies
yarn add --save-dev @babel/core @babel/preset-react @babel/preset-env babel-loader style-loader css-loader

# create webpack.config.js and add webpack related configuration

# Add Babel presets in package.json

# create index.html in public folder and index.js, index.css files in src
