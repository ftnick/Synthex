const repoOwner = 'ftnick';
const repoName = 'Synthex-Roblox';
const workflowName = 'pages'; // Replace with the name of your GitHub Actions workflow

async function findDeploymentJob() {
  const githubToken = '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'; // Replace with your GitHub token

  // Check if the GitHub token is provided
  if (!githubToken) {
    console.error('GitHub token is missing. Please provide a valid token.');
    return 'Token missing';
  }

  try {
    // Get the most recent workflow run /workflows/${workflowName}
    const workflowResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/actions/runs?per_page=1`, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!workflowResponse.ok) {
      console.error(`Failed to fetch workflow run information. Status: ${workflowResponse.status}`);
      return 'Failed to fetch workflow run information';
    }

    const workflowData = await workflowResponse.json();

    if (workflowData.workflow_runs.length === 0) {
      console.error('No workflow runs found');
      return 'No workflow runs found';
    }

    const latestRun = workflowData.workflow_runs[0];

    // Get jobs for the latest run
    const jobsResponse = await fetch(latestRun.jobs_url, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!jobsResponse.ok) {
      console.error(`Failed to fetch job information. Status: ${jobsResponse.status}`);
      return 'Failed to fetch job information';
    }

    const jobsData = await jobsResponse.json();

    // Find the deployment job
    const deploymentJob = jobsData.jobs.find(job => job.name === 'deploy');

    // Check job status
    if (!deploymentJob) {
      return 'Deployment job not found';
    } else if (deploymentJob.status === 'completed') {
      return 'Deployment completed';
    } else if (deploymentJob.status === 'in_progress') {
      return 'Deployment is currently running';
    } else {
      return `Deployment job status: ${deploymentJob.status}`;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return 'An error occurred';
  }
}

// Example usage
findDeploymentJob().then((result) => {
  console.log(result);
});
