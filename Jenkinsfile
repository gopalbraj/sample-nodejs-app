pipeline {
    agent any
    
  tools {nodejs "node"}
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/gopalbraj/sample-nodejs-app.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                // Add your test command here
                // For example, sh 'npm run test'
                echo 'Running tests...'
            }
        }
        stage('Deploy') {
            steps {
                // Add your deployment commands here
                // This example will just run the application
                echo 'Deploying application...'
                sh 'nohup npm start &'
            }
        }
    }
}
