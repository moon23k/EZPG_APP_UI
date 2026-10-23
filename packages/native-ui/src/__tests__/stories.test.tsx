import path from 'node:path';
import { renderAllStories } from '../../../../jest/render-stories';

renderAllStories(path.resolve(__dirname, '..'));
