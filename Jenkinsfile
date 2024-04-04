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
                sh 'npm install -g @lhci/cli@0.13.x'
                sh 'node lighthouse-tests.js'
                //sh 'lhci autorun'
            }
        }
    }
    post {
        always {
            lighthouseReport 'lighthouse/reports'
        }
    }
  
}
