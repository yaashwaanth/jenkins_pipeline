@Library("Shared") _
pipeline {
    agent { label "gys" }

    environment {
        DOCKER_BUILDKIT = "1"  // Enable BuildKit
    }

    stages {
        stage("Hello"){
            steps{
                script{
                    hello()
                }
            }
        }
        stage("Code") {
            steps {
                // echo "This is cloning the code"
                // git url: "https://github.com/yaashwaanth/jenkins_pipeline", branch: "main"
                // echo "Code cloning successful"
                
                script{
                    clone("https://github.com/yaashwaanth/jenkins_pipeline","main")
                }
            }
        }
        stage("Build") {
            steps {
                echo "This is building the code"
                sh "docker build -t my-nodejs-app:latest ."  // Using `.` as build context
            }
        }
        stage("Push to DockerHub") {
            steps {
                echo "Pushing the Image to docker hub"
                withCredentials([usernamePassword('credentialsId':"dockerHubCred",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                sh "docker image tag my-nodejs-app:latest yaashwaanth17/my-nodejs-app:latest"
                sh "docker push ${env.dockerHubUser}/my-nodejs-app:latest"
                }
            }
        }
        stage("Deploy") {
            steps {
                echo "This is Deploying the code"
                sh "docker compose up -d "
            }
        }
    }
}
