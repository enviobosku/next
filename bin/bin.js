#!/usr/bin/env node

const fs = require("fs");

//check to see if hardhat is correctly set up. 
let hre;
try {
    hre = require("hardhat");
}
catch(err) {
    console.log(err.message)
    console.log("Artifact generation failed")
    console.log("Make sure you have hardhat installed as a dev dependency & a hardhat.config.js file is in your project root")
    process.exit(1);
}


/*******************************************

Creates artifacts.json in project
root directory.

*******************************************/


async function main() {
    
    const artifactNames = await hre.artifacts.getAllFullyQualifiedNames()
    const artifactPromises = artifactNames.map(
        (name) => hre.artifacts.readArtifact(name)
    )

    const hardhatArtifacts = await Promise.all(artifactPromises);

    fs.writeFileSync("./artifacts.json", JSON.stringify(hardhatArtifacts));
    return hardhatArtifacts;

}



main()
.then(() => {
    console.log("Artifact generation successful");
    process.exit(0)
})
.catch(err => {
        console.log(err)
        process.exit(1)
    }
)