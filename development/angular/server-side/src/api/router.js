const router = require('express').Router();
const dist_wise_data = require('./controller/dist_wise_data');
const block_wise_data = require('./controller/block_wise_data');
const cluster_wise_data = require('./controller/cluster_wise_data');
const school_wise_data = require('./controller/school_wise_data');
const getSchoolData = require('./controller/getSchoolData');
const login = require('./controller/adminLogin');
const blcokPerDist = require('./controller/blockPerDistrict');
const clustePerBlock = require('./controller/clusterPerBlocks');
const schoolPerCluster = require('./controller/schoolsPerCluster');
const clusterPerDist = require('./controller/clustersPerDist');
const schoolPerDist = require('./controller/schoolPerDist');
const schoolPerBlock = require('./controller/schoolPerBlock');

router.use('/dist_wise_data', dist_wise_data);
router.use('/block_wise_data', block_wise_data);
router.use('/cluster_wise_data', cluster_wise_data);
router.use('/school_wise_data', school_wise_data);
router.use('/getSchoolData', getSchoolData);
router.use('/login', login);
router.use('/blcokPerDist', blcokPerDist);
router.use('/clustePerBlock', clustePerBlock);
router.use('/schoolPerCluster', schoolPerCluster);
router.use('/clusterPerDist', clusterPerDist);
router.use('/schoolPerDist', schoolPerDist);
router.use('/schoolPerBlock', schoolPerBlock);

module.exports = router;