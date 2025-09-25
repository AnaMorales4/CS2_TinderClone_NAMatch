pipeline {
    agent any

    triggers {
        // Polls GitHub for PR changes (or use webhooks)
        pollSCM('* * * * *') 
    }

    environment {
        // Define any env vars if needed
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the pull request code
                checkout scm
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                echo "Building Docker image for frontend"
                sh '''
                cd front
                docker build -t my-front-test -f Dockerfile .
                '''
            }
        }

        stage('Run Backend Frontend') {
            steps {
                echo "Running frontend container"
                sh '''
                docker run -d -p 80:8081 --name front-container-test my-front-test
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo "Building Docker image for backend"
                sh '''
                cd back
                docker build -t my-back-test -f Dockerfile .
                '''
            }
        }

        stage('Run Backend Container') {
            steps {
                echo "Running backend container"
                sh '''
                docker run -d -p 5000:5000 --name back-container-test my-back-test
                '''
            }
        }

    stage('Cleanup Docker') {
            steps {
                echo "Cleaning up Docker container"
                sh '''
                docker kill front-container-test || true
                docker rm front-container-test || true
                docker kill back-container-test || true
                docker rm back-container-test || true
                '''
            }
        }


    stage('Running docker compose') {
            steps {
                echo "Running docker compose"
                sh '''
                docker compose up --build
                '''
            }
        }

    post {
        success {
            echo "Build succeeded for PR: ${env.CHANGE_ID}"
        }
        failure {
            echo "Build failed for PR: ${env.CHANGE_ID}"
        }
    }
}
