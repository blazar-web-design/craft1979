import { buildEpisodes } from '../utils/episodes'
import { episodeSources } from './episode-sources'
import generated from './episode-sources.generated.json'

export const episodes = buildEpisodes(episodeSources, generated.thumbnails)
