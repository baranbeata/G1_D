#!/bin/bash

cd security

mvn -U clean install

mvn -B package --file pom.xml

#mvn clean compile assembly:single

mvn exec:java -X -Dexec.mainClass=com.example.security

#cd target

#java -jar minie-0.0.1-SNAPSHOT.jar
