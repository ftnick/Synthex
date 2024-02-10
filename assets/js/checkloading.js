const repoOwner = 'ftnick';
const repoName = 'Synthex-Roblox';

async function findDeploymentJob() {
  const githubToken = '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'; // Replace with your GitHub token

  // Check if the GitHub token is provided
  if (!githubToken) {
    console.error('GitHub token is missing. Please provide a valid token.');
    return 'Token missing';
  }

  try {
    // Get the most recent deployment
    const deploymentResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/deployments?per_page=1`, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!deploymentResponse.ok) {
      console.error(`Failed to fetch deployment information. Status: ${deploymentResponse.status}`);
      return 'Failed to fetch deployment information';
    }

    const deploymentData = await deploymentResponse.json();

    if (deploymentData.length === 0) {
      console.error('No deployments found');
      return 'No deployments found';
    }

    const latestDeployment = deploymentData[0];

    // Check deployment status
    if (latestDeployment.status === 'success') {
      return 'Deployment completed';
    } else if (latestDeployment.status === 'pending') {
      return 'Deployment is pending';
    } else if (latestDeployment.status === 'in_progress') {
      return 'Deployment is currently running';
    } else {
      return `Deployment status: ${latestDeployment.status}`;
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
