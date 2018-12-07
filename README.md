 Reviews_staybnb
Working on SDC Project
 To start the application: npm start (It starts on port: 7000)
 To build the bundle: npm run react-dev
--------------------------------------------------
            To Populate the database
--------------------------------------------------
 To populate mongo database with 10M records: npm run seed-mongo.
 To populate sequelize database with 10M records: npm run seed-sequelize
 To populate postgres database with 10M records: npm run build-csv and then npm run load-csv
 To populate sequelize database with 10M records: npm run seed-sequelize
 To populate mySQL database with 100 records: npm run seed1 and then npm run seed2

--------------------------------------------------
            Docker
--------------------------------------------------
Check the docs:
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

https://docs.google.com/document/d/1xO_tIRDKQs5BdbyH223-oFX-p5RQ3_iRJMjOylF3B9Y/edit

To see docker images: docker images
To see the containers: docker ps -a

To update the docker image and container: 
    Step1: docker stop <container-ID>
    Step2: docker rm <container-ID>
    Step3: docker image rm <image-ID>
    Step4: docker build -t <your username>/app_name
    Step5: docker run -p <port-of-docker>:<port of server of your application > -d <image-ID>
--------------------------------------------------
        Will push your image onto the hub
--------------------------------------------------
   Step6: docker commit <container-ID>
   Step7: docker push <image name>

--------------------------------------------------
        Deploy the postgres with docker
--------------------------------------------------
https://docs.google.com/document/d/1fB25ztfLPGAoMn0sjTOng-hJv_GkrSfbKfAhbjT13H4/edit

Make an AWS-EC2 instance:
   Step1: select the free EC2 instance, tier2
   Step2: add storage according to your database size
   Step3: follow the step and launch
   Step4: save the key in your project
   Step4: On command line
   Change permissions on downloaded .pem key file:
        Local: `chmod 400 exproj.pem`

Connect to AWS via ssh:
    Local: `ssh -i exproj.pem ubuntu@123.456.78.90` You will need to use your own public URL in this command.

Update your AWS image (you should only need to do this once / very infrequently):
    AWS: `sudo apt-get update -y`
    curl -sSL https://get.docker.com/ | sh
    sudo service docker start
    Runs docker image
    sudo docker run -p 80:7000 -d mfosho1/staybnb
    Access image/repository
    sudo docker exec -it [name of image] bash


For deploying postgres database,
    Runs docker image
    sudo docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=[password] postgres
    Runs docker exec statement
    sudo docker exec -it my_postgres bash


    Install command to edit files in bash
    apt-get update
    apt-get install nano

 For seeding your deployed database:

DUMPING DATABASE (PIPE):
pg_dump -C -h localhost -U defaultusername -d postgres | psql -h awspublic --username defaultusername --dbname postgres (edited)

 for my project:
pg_dump -C -h localhost -U indu -d sdcknex | psql -h 34.217.37.178 --username postgres --dbname postgres



 For installing Mongo Database:

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

https://medium.com/@calvin.hsieh/steps-to-install-mongodb-on-aws-ec2-instance-62db66981218

 To seed the mongo database

mongodump -h sourceHost -d yourDatabase … | mongorestore -h targetHost -d yourDatabase …

 For my project:
mongodump -h localhost -d SDC | mongorestore -h 18.237.108.253 




