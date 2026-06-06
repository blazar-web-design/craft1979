import { buildEpisodes } from '../utils/episodes'
import { episodeSources, episodeThumbnails } from './episode-sources'

export const episodes = buildEpisodes(episodeSources, episodeThumbnails)
