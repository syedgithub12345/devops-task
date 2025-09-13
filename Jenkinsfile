pipeline {
    agent any

    environment {
        IMAGE_NAME = "syedsafi/devops-task"
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code..."
                checkout scm
            }
        }

        stage('Install & Test') {
            steps {
                echo "Installing dependencies and running tests..."
                bat 'npm ci'
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image..."
                bat "docker build -t %IMAGE_NAME%:%TAG% ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                echo "Logging in and pushing to DockerHub..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                    bat "docker push %IMAGE_NAME%:%TAG%"
                }
            }
        }

        stage('Deploy (placeholder)') {
            steps {
                echo "Deploy to AWS/GCP will be added here later"
            }
        }
    }

    post {
        always {
            echo "Cleaning up local image"
            bat "docker rmi %IMAGE_NAME%:%TAG% || echo image not found"
        }
        success {
            echo "Build succeeded: ${env.BUILD_URL}"
        }
        failure {
            echo "Build failed - check logs"
        }
    }
}