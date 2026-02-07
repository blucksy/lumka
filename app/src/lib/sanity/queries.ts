import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const projectQuery = groq`
{
  "project": *[_type == "exhibition" && slug.current == $slug][0] {
    ...,
    content[] {
      "mediaType": select(
        asset->_type == "sanity.imageAsset" => "image",
        asset->_type == "mux.videoAsset" => "video"
      ),

      "asset": select(
        asset->_type == "mux.videoAsset" => asset->,
        true => asset
      )
    }
  },
  "label": *[_type == "settings"][0]{thumbnailLabel}
}
`;

export const homeQuery = groq`*[_type == "settings" ][0] {homepage[]->{color,content,title, slug}}`;

export const projectsQuery = groq`*[_type == "exhibition"] | order(orderRank asc) {
  "color": color.hex,
  "content": content[0..3],
  "slug": slug.current
}`;

export const infoQuery = groq`*[_type == "settings" ][0] {...}`;

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
}

export interface Project {
	_type: 'project';
	_createdAt: string;
	title?: string;
	slug: Slug;
	content: ImageAsset[];
	color?: string;
	tag?: { _ref: string }[];
}
