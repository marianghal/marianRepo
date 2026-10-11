
pipeline {
    agent {
        label 'docker'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t Marian/docker-react -f Dockerfile.dev .'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'docker run --rm -e CI=true Marian/docker-react npm test -- --watchAll=false'
                }
            }
        }
    }
}
