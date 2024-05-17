import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

// Define the YAML_CONFIG_FILENAME constant
const YAML_CONFIG_FILENAME = 'config.yaml';

// Define the loadYamlConfig function
const loadYamlConfig = () => {
  // Define the filePath variable
  const filePath = path.join(__dirname, '../../', YAML_CONFIG_FILENAME);
  if (fs.existsSync(filePath)) {
    return yaml.load(fs.readFileSync(filePath, 'utf8')) as Record<string, any>;
  }
  // In case there is any erro or the file does not exist, return an empty object.
  return {};
};

export { loadYamlConfig };
