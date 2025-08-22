// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HealthRecords
 * @dev This contract manages ownership and access control for sensitive health records.
 * The actual record data is stored off-chain (e.g., on IPFS) and encrypted.
 * This contract only stores a pointer (the CID) and manages who can access it.
 */
contract HealthRecordsV2 {

    struct Record {
        string cid;         // The IPFS Content Identifier (CID) for the encrypted off-chain data.
        address owner;      // The address of the patient who owns this record.
    }

    // --- State Variables ---

    // Mapping from a record's unique hash to the Record struct.
    // We use a hash of the CID as a fixed-size key.
    mapping(bytes32 => Record) public records;
    // Mapping to keep a list of all record hashes owned by a patient.
    mapping(address => bytes32[]) public patientRecords;
    
    // The Access Control List (ACL).
    // Maps a record's hash to another mapping of a doctor's address to a boolean (true if they have access).
    // mapping(recordHash => mapping(doctorAddress => hasAccess))
    mapping(bytes32 => mapping(address => bool)) public accessList;

    // NEW: Mapping to store pending access requests from doctors.
    // mapping(recordHash => mapping(doctorAddress => isRequestPending))
    mapping(bytes32 => mapping(address => bool)) public accessRequests;

    // --- Events ---
    // Emitted when a new record is successfully added by a patient.
    event RecordAdded(
        address indexed patient, 
        bytes32 indexed recordHash, 
        string cid
    );
    // Emitted when a patient grants access to a doctor for a specific record.
    event AccessGranted(address indexed patient, address indexed doctor, bytes32 indexed recordHash);
    // Emitted when a patient revokes a doctor's access to a specific record.
    event AccessRevoked(address indexed patient, address indexed doctor, bytes32 indexed recordHash);
    
    // NEW Events for the request flow
    event AccessRequested(address indexed doctor, bytes32 indexed recordHash, address indexed patient);
    event RequestApproved(address indexed patient, address indexed doctor, bytes32 indexed recordHash);
    event RequestDenied(address indexed patient, address indexed doctor, bytes32 indexed recordHash);


    // --- Modifiers ---
    // A modifier to ensure that the function caller is the owner of a specific record.
    modifier onlyRecordOwner(bytes32 _recordHash) {
        require(records[_recordHash].owner == msg.sender, "Caller is not the record owner");
        _;
    }


    // --- Core Functions ---

    /**
     * @dev Allows a patient to add a new record for themselves.
     * @param _cid The IPFS CID of the encrypted health record.
     */
    // --- Record Management Functions ---
    function addRecord(string memory _cid) external {
        bytes32 recordHash = keccak256(abi.encodePacked(_cid));
        require(records[recordHash].owner == address(0), "Record already exists");

        records[recordHash] = Record({ cid: _cid, owner: msg.sender });
        patientRecords[msg.sender].push(recordHash);
        emit RecordAdded(msg.sender, recordHash, _cid);
    }

    /**
     * @dev Allows a patient to grant a doctor access to one of their records.
     * @param _recordHash The hash of the record's CID.
     * @param _doctor The address of the doctor being granted access.
     */
    // --- Proactive Access Management (Patient-Initiated) ---
    function grantAccess(bytes32 _recordHash, address _doctor) external onlyRecordOwner(_recordHash) {
        require(_doctor != msg.sender, "Cannot grant access to yourself");
        accessList[_recordHash][_doctor] = true;
        emit AccessGranted(msg.sender, _doctor, _recordHash);
    }

    /**
     * @dev Allows a patient to revoke a doctor's access to one of their records.
     * @param _recordHash The hash of the record's CID.
     * @param _doctor The address of the doctor whose access is being revoked.
     */
    function revokeAccess(bytes32 _recordHash, address _doctor) external onlyRecordOwner(_recordHash) {
        accessList[_recordHash][_doctor] = false;
        emit AccessRevoked(msg.sender, _doctor, _recordHash);
    }

    // --- NEW: Request Management (Doctor-Initiated) ---

    /**
     * @dev Allows a doctor to request access to a patient's record.
     * @param _recordHash The hash of the record's CID they want to access.
     */
    function requestAccess(bytes32 _recordHash) external {
        address patient = records[_recordHash].owner;
        require(patient != address(0), "Record does not exist");
        require(patient != msg.sender, "Owner cannot request access to own record");
        require(!accessList[_recordHash][msg.sender], "Already has access");
        require(!accessRequests[_recordHash][msg.sender], "Request already pending");

        accessRequests[_recordHash][msg.sender] = true;
        emit AccessRequested(msg.sender, _recordHash, patient);
    }

    /**
     * @dev Allows a patient to approve a pending access request from a doctor.
     * @param _recordHash The hash of the record's CID.
     * @param _doctor The address of the doctor who made the request.
     */
    function approveAccessRequest(bytes32 _recordHash, address _doctor) external onlyRecordOwner(_recordHash) {
        require(accessRequests[_recordHash][_doctor], "No pending request from this doctor");

        // Clear the pending request
        accessRequests[_recordHash][_doctor] = false;
        
        // Grant the access
        accessList[_recordHash][_doctor] = true;
        emit RequestApproved(msg.sender, _doctor, _recordHash);
    }

    /**
     * @dev Allows a patient to deny a pending access request from a doctor.
     * @param _recordHash The hash of the record's CID.
     * @param _doctor The address of the doctor who made the request.
     */
    function denyAccessRequest(bytes32 _recordHash, address _doctor) external onlyRecordOwner(_recordHash) {
        require(accessRequests[_recordHash][_doctor], "No pending request from this doctor");

        // Simply clear the pending request
        accessRequests[_recordHash][_doctor] = false;
        emit RequestDenied(msg.sender, _doctor, _recordHash);
    }

    // --- View Functions ---
    /**
     * @dev Checks if a given user (patient or doctor) has access to a record.
     * @param _recordHash The hash of the record's CID.
     * @param _user The address of the user to check.
     * @return A boolean indicating if the user has access.
     */
    function checkAccess(bytes32 _recordHash, address _user) external view returns (bool) {
        if (records[_recordHash].owner == _user) {
            return true;
        }
        return accessList[_recordHash][_user];
    }

     /**
     * @dev Retrieves all record hashes for a specific patient.
     * @param _patient The address of the patient.
     * @return An array of record hashes.
     */
    function getPatientRecords(address _patient) external view returns (bytes32[] memory) {
        return patientRecords[_patient];
    }
}