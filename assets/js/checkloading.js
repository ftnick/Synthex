const repoOwner = 'ftnick';
const repoName = 'Synthex-Roblox';

async function checkDeploymentStatus() {
  const githubToken = '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'; // Replace with your GitHub token

  // Check if the GitHub token is provided
  if (!githubToken) {
    console.error('GitHub token is missing. Please provide a valid token.');
    return 'Token missing';
  }

  // Get the most recent deployment
  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/deployments?per_page=1`, {
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch deployment information');
    return 'Failed to fetch deployment information';
  }

  const data = await response.json();
  if (data.length === 0) {
    console.error('No deployments found');
    return 'No deployments found';
  }

  const latestDeployment = data[0];

  // Check deployment status
  if (latestDeployment.state === 'pending') {
    return 'Pending Deploy';
  } else if (latestDeployment.state === 'in_progress') {
    return 'Deployment is currently running';
  } else {
    return 'Deployment is not pending or in progress';
  }
}

// Example usage
checkDeploymentStatus().then((result) => {
  console.log(result);
});
