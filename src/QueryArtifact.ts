import { Artifact } from "hardhat/types";
import { ethers } from "ethers";



interface IQueryArtifact {
    bytecode: string;
    interface: ethers.utils.Interface;
    bytecodeEncodedArgs?: string;
}





/// holds key information about each query contract 
export class QueryArtifact implements IQueryArtifact {
    // deployment bytecode of the query
    bytecode: string;

    interface: ethers.utils.Interface

    bytecodeEncodedArgs?: string;

    constructor(hardhatArtifact: Artifact) {
        this.bytecode = hardhatArtifact.bytecode;
        this.interface = new ethers.utils.Interface(hardhatArtifact.abi);
    }

    /// @dev assumes constructor args are already encoded if they exist
    run() {

    }

    /// @error throws an error in case of type mismatch of args 
    encodeArgs(args?: any[]) {
        // 
        const encodedArgs = this.interface.encodeDeploy(args);
        this.bytecodeEncodedArgs = ethers.utils.hexConcat([this.bytecode, encodedArgs]);
    }

    constructAndRun(args?: any[]) {
        this.encodeArgs(args);
        console.log(this.bytecodeEncodedArgs)

        return this.bytecodeEncodedArgs;
    }

}
