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
                sh 'npm install -g lighthouse'
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
         stage('Performance Tests') {
  steps {
    deleteDir()
    checkout scm
    sh 'npm install'
    sh 'npm run lighthouse'
  }
  post {
    always {
      publishHTML (target: [
        allowMissing: false,
        alwaysLinkToLastBuild: false,
        keepAll: true,
        reportDir: '.',
        reportFiles: 'lighthouse-report.html',
        reportName: "Lighthouse"
      ])
    }
  }
}
    }
}
