````markdown
# DevOps Task – CI/CD Pipeline for Node.js Application

## Objective

Set up a complete CI/CD pipeline for a sample Node.js application using GitHub, Jenkins, Docker, and Render. The pipeline demonstrates automation, scalability, and DevOps best practices.

---

## 1a. Source Code & Version Control (GitHub)

**Repository used:** [syedgithub12345/devops-task](https://github.com/syedgithub12345/devops-task)

### ✅ Work Completed

1. **Forked and Cloned Repository**
   - Forked the original repository `SwayattDrishtigochar/devops-task`.
   - Cloned it locally:  
     ```bash
     git clone https://github.com/syedgithub12345/devops-task.git
     cd devops-task
     ```

2. **Configured Branching Strategy**
   - Created `main` and `dev` branches.
   - Used `dev` branch for all development work:
     ```bash
     git checkout -b dev
     git push origin dev
     ```

3. **Git Remote Verification**
   - Verified `origin` points to my fork.
   - (Optional) added `upstream` to track original repo.

4. **Commits & Pushes**
   - Pushed all updated files (Dockerfile, Jenkinsfile, etc.) to `dev` branch.
   - Merged into `main` for deployment.

📸 **Screenshots**
<img width="1638" height="943" alt="Screenshot 2025-09-14 135748" src="https://github.com/user-attachments/assets/04fbcfc7-2d8f-4083-a95b-b78e0ef19a70" />
<img width="232" height="244" alt="Screenshot 2025-09-14 135848" src="https://github.com/user-attachments/assets/7bbf9081-2463-41bc-a04d-f1e45bca3cff" />

---

## 1b. Jenkins CI/CD Pipeline Setup

### ✅ Work Completed

1. **Installed Jenkins locally**
   - Installed Jenkins and accessed at `http://localhost:8080`

2. **Installed Required Tools Locally**
   - Node.js, npm
   - Docker
   - Jenkins

3. **Created Jenkins Pipeline**
   - Configured a multibranch pipeline connected to my GitHub repo.
   - Added GitHub webhook to trigger builds on push.

4. **Created Jenkinsfile**

```groovy
pipeline {
    agent any

    environment {
        IMAGE_NAME = "syedsafi/devops-task"
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install & Test') {
            steps {
                bat 'npm ci'
                bat 'npm test'
            }
        }
        stage('Docker Build') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%TAG% ."
            }
        }
        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                    bat "docker push %IMAGE_NAME%:%TAG%"
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deployment handled on Render"
            }
        }
    }

    post {
        always {
            bat "docker rmi %IMAGE_NAME%:%TAG% || echo image not found"
        }
    }
}
````

📸 **Screenshots to include in `/deployment-proof/`:**

* Jenkins dashboard showing your pipeline
* Pipeline run logs for each stage (build, test, docker build, push)
* Success status of build

<img width="1919" height="969" alt="Screenshot 2025-09-14 010646" src="https://github.com/user-attachments/assets/8a8a6869-05d2-41a5-8cf3-837e271b612e" />
<img width="1919" height="962" alt="Screenshot 2025-09-14 012729" src="https://github.com/user-attachments/assets/0a2c06eb-46df-4b7b-a0e7-7fcd7a4a64f3" />
<img width="1917" height="967" alt="Screenshot 2025-09-14 012741" src="https://github.com/user-attachments/assets/d0c4858c-2506-44fa-9504-6bf7ad97d065" />
<img width="1919" height="871" alt="Screenshot 2025-09-14 001216" src="https://github.com/user-attachments/assets/64ec677d-1ba6-40ff-95d1-7723dc65357e" />

<img width="376" height="187" alt="Screenshot 2025-09-14 001525" src="https://github.com/user-attachments/assets/e4194fe1-ef0a-432c-b1c0-fb75a379060b" />
<img width="1919" height="945" alt="Screenshot 2025-09-14 015027" src="https://github.com/user-attachments/assets/a2cac15c-d8f2-4923-a28f-45a3abb33208" />

---

## 1c. Dockerization

### ✅ Work Completed

1. **Created Dockerfile**

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

2. **Built Docker Image**

```bash
docker build -t swayatt-logo-app .
```

3. **Tested Image Locally**

```bash
docker run -p 3000:3000 swayatt-logo-app
```

📸 **Screenshots**
<img width="1919" height="977" alt="Screenshot 2025-09-14 104830" src="https://github.com/user-attachments/assets/29481f5f-d620-4132-805f-2e63d9544d4c" />

---

## 1d. Deployment (Render)

### ✅ Work Completed

1. **Used Render as Cloud Platform**

   * Created new Web Service on Render.
   * Connected GitHub repo (`main` branch).

2. **Configured Commands**

   * Build command: `npm install`
   * Start command: `node app.js`

3. **Deployed Successfully**

   * Live URL generated: `https://devops-task-cdsw.onrender.com`
   * Application shows Swayatt logo on browser.

📸 **Screenshots**

<img width="1919" height="1026" alt="Screenshot 2025-09-14 102327" src="https://github.com/user-attachments/assets/8f248d5b-fa82-4e66-b86e-b1dacd79fd17" />
<img width="1919" height="954" alt="Screenshot 2025-09-14 102733" src="https://github.com/user-attachments/assets/40105f97-3e04-43dc-9479-84c55f121938" />

<img width="1661" height="879" alt="image" src="https://github.com/user-attachments/assets/8e477dd2-6cb8-4044-aae3-834da76e51c6" />


---

## 1e. Monitoring & Logging

### ✅ Work Completed

1. **Used Render’s in-built logs**

   * Accessed logs to verify build and request logs.
2. **Monitored application health (uptime, status)**

📸 **Screenshots**

<img width="1676" height="912" alt="image" src="https://github.com/user-attachments/assets/3a4ab667-59f6-4b26-8b97-aed5f77c878f" />

---

## 📁 Project Structure

```
├── app.js
├── package.json
├── logoswayatt.png
├── Dockerfile
├── Jenkinsfile
├── README.md
├── deployment-proof/        # Contains screenshots of all steps
└── docs/
    └── architecture.png      # Architecture diagram
```

---

## 📊 Architecture Diagram

> (Add `/docs/architecture.png` showing:)
> GitHub → Jenkins → Docker Build → DockerHub → Render Deployment → Logs & Monitoring

---

## 🛠 Tools & Services Used

* **GitHub** – version control
* **Node.js + npm** – application runtime
* **Docker** – containerization
* **Jenkins** – CI/CD automation
* **Render** – cloud deployment and hosting
* **Git branching strategy** – main (prod) and dev (development)

---

## 📌 Public Deployed Link

[https://devops-task-cdsw.onrender.com](https://devops-task-cdsw.onrender.com)

---

```

---
