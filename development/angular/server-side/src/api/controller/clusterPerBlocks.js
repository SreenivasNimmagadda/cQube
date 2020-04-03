const router = require('express').Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    var clusters = [];
    var blockId = req.body.blockId;
    var baseUrl = req.body.baseUrl;
    var token = req.headers.token;

    var allClusters = await axios.get(`${baseUrl}/cluster_wise_data`, { 'headers': { 'token': "Bearer" + token } });

    var clusterDetails = [];
    allClusters.data.forEach(clusters => {
        if (blockId === clusters.block_id) {
            obj = {
                x_axis: clusters.x_axis,
                blockName: clusters.block_name,
                distName: clusters.district_name,
                crc_name: clusters.crc_name,
                x_value: clusters.x_value,
                y_value: clusters.y_value,
                z_value: clusters.z_value
            }
            clusterDetails.push(obj);
        }

    });
    res.send(clusterDetails);
});

module.exports = router;