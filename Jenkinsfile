pipeline {
    agent any

    environment {
        HROME_PATH="/usr/bin/google-chrome"
    }
 
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
                sh 'lhci autorun'
            }
        }
    }
    post {
        always {
            lighthouseReport 'lighthouse/reports/reports'
        }
    }
  
}
