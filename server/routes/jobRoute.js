const {
  addJob,
  getCompanyJobs,
  getAllJobs,
  getJobsForSpecificSector,
  getJob,
  applyForJob,
  getCompanyJobDetail,
  updateJobStatus,
  getAppliedJobs,
  getAppliedJobsApp,
  getSavedJobs,
  editJob,
  getCompanyJobDetailApp,
  deleteJob,
  deactiveJob,
  saveJob,
  getAllActiveJobs,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/addJob", addJob);
router.get("/getCompanyJobs", getCompanyJobs);
router.get("/getCompanyJobDetail", getCompanyJobDetail);
router.route("/getCompanyJobDetailApp").get(protect, getCompanyJobDetailApp);
// router.get("/getCompanyJobDetailApp", getCompanyJobDetailApp);
router.get("/getAllJobs", getAllJobs);
router.get("/getSectorJob", getJobsForSpecificSector);
router.get("/getJob", getJob);
router.post("/updateJobStatus", updateJobStatus);
router.get("/getAllActiveJobs", getAllActiveJobs);

router.route("/savedJobs").get(protect, getSavedJobs);
router.route("/appliedJobs").get(protect, getAppliedJobs);
router.route("/appliedJobsApp").get(protect, getAppliedJobsApp);
router.route("/applyForJob").post(protect, applyForJob);
router.route("/saveJob/:id").post(protect, saveJob);
router.route("/editJob").put(protect, editJob);
router.route("/deleteJob/:id").delete(protect, deleteJob);

// router.route("/deactiveJob").put(protect, deactiveJob);

module.exports = router;
