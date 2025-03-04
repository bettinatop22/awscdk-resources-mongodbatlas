// Copyright 2023 MongoDB Inc
//
// Licensed under the Apache License, Version 2.0 (the License);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import {
  CfnClusterOutageSimulation,
  FilterCloudProvider,
} from "../../../src/l1-resources/cluster-outage-simulation";

const RESOURCE_NAME = "MongoDB::Atlas::ClusterOutageSimulation";
const PROJECTI_ID = "test_project_id";
const PROFILE = "default";
const CLUSTER_NAME = "testProjectId";
const CLOUD_PROVIDER = FilterCloudProvider.AWS;
const REGION = "US_WEST_1";
const TYPE = "REGION";

test("CfnClusterOutageSimulation construct should contain default properties", () => {
  const mockApp = new App();
  const stack = new Stack(mockApp);

  new CfnClusterOutageSimulation(stack, "testing-stack", {
    projectId: PROJECTI_ID,
    profile: PROFILE,
    clusterName: CLUSTER_NAME,
    outageFilters: [
      {
        cloudProvider: CLOUD_PROVIDER,
        region: REGION,
        type: TYPE,
      },
    ],
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties(RESOURCE_NAME, {
    ProjectId: PROJECTI_ID,
    Profile: PROFILE,
    ClusterName: CLUSTER_NAME,
    OutageFilters: [
      {
        CloudProvider: CLOUD_PROVIDER,
        Region: REGION,
        Type: TYPE,
      },
    ],
  });
});
