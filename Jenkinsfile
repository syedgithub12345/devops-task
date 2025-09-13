pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'syedsafi'
        IMAGE_NAME = 'devops-task'
    }
    stages {
        stage('Build') {
            steps {
                bat 'npm ci'
                bat 'npm test'
            }
        }
        stage('Dockerize') {
            steps {
                bat "docker build -t %DOCKER_HUB_USER%/%IMAGE_NAME%:latest ."
            }
        }
        stage('Push to Registry') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    bat 'echo %PASSWORD% | docker login -u %USERNAME% --password-stdin'
                    bat "docker push %DOCKER_HUB_USER%/%IMAGE_NAME%:latest"
                }
            }
        }
        // Next stage will be ECS/GKE deploy — we’ll add this later
    }
}