pipeline {
    agent any
    tools {
        nodejs "node" 
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm 
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('YourSonarQube') {
                    sh 'npm run sonar'
                }
            }
        }
    }
}
