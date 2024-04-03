pipeline {
    environment {
        HROME_PATH="/usr/bin/google-chrome"
    }
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
                sh 'npm install -g @lhci/cli'
                sh 'npm install chrome-launcher'
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
                //sh 'nohup npm start &'
            }
        }
        stage('Performance Tests') {
          //steps {
             // script{
                  //sh 'lighthouse https://google.com --chrome-flags --headless --quiet --output json --output-path lighthouse_report.json'
                  //sh 'npx lighthouse-ci https://www.google.com'
                  //--jsonReport --report=.' 
                  //lighthouseReport('./report.json')
                //  sh 'lhci autorun'
              //}

              steps {
                script {
                    // Replace http://your-app-url.com with the URL of the site you want to audit
                    // The --output-path flag specifies where the report will be saved
                    sh 'lighthouse https://verizon-nextjs-sandbox-default.glb.edgio.link/ngd/blueprint/smartphones --output json --output-path ./lighthouse-report.json'
                }
            }
        }
    }
    post {
        always {
            // You can archive the reports, email them, or add steps to analyze the results.
            archiveArtifacts artifacts: 'lighthouse-report.json', onlyIfSuccessful: true
        }
    }
  
}
