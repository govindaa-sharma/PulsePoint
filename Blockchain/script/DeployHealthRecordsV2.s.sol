// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script,console} from "forge-std/Script.sol";
import {HealthRecordsV2} from "../src/HealthRecordsV2.sol";

contract DeployHealthRecordsV2 is Script {
    function run() external returns (HealthRecordsV2) {
        vm.startBroadcast();
        
        HealthRecordsV2 healthRecords = new HealthRecordsV2();
        console.log("HealthRecordsV2 deployed at:", address(healthRecords));

        vm.stopBroadcast();
        
        return healthRecords;
    }
}