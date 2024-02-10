const repoOwner = 'ftnick';
        const repoName = 'Synthex-Roblox';
    
        async function getTimeSinceUpdate() {
          const githubToken = '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';
    
          if (!githubToken) {
            console.error('GitHub token is missing. Please provide a valid token.');
            return 'Token missing';
          }
    
          try {
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
    
            const updatedAt = new Date(latestDeployment.updated_at);
            const currentTime = new Date();
            const timeDifference = currentTime - updatedAt;
            const timeSinceUpdate = Math.floor(timeDifference / (1000 * 60)) + ' minutes';
    
            if (timeSinceUpdate === '0 minutes') {
              return 'Just now';
            }
    
            if (timeSinceUpdate === '1 minutes') {
              return '1 minute';
            }
    
            return `Time since update: ${timeSinceUpdate}`;
          } catch (error) {
            console.error('An error occurred:', error);
            return 'An error occurred';
          }
        }
    
        getTimeSinceUpdate().then((result) => {
          document.getElementById('updateTimeLi').textContent = result;
        });