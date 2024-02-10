const repoOwner = 'ftnick';
const repoName = 'Synthex-Roblox';

async function checkDeploymentStatus() {
  const githubToken = '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'; // Replace with your GitHub token

  // Check if the GitHub token is provided
  if (!githubToken) {
    console.error('GitHub token is missing. Please provide a valid token.');
    return 'Token missing';
  }

  try {
    // Get the most recent deployment
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/deployments?per_page=1`, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    console.log('Response:', response);

    if (!response.ok) {
      console.error(`Failed to fetch deployment information. Status: ${response.status}`);
      return 'Failed to fetch deployment information';
    }

    const data = await response.json();
    console.log('Data:', data);

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
  } catch (error) {
    console.error('An error occurred:', error);
    return 'An error occurred';
  }
}

// Example usage
checkDeploymentStatus().then((result) => {
  console.log(result);
});
