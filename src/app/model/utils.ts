export const replaceSpecialChars = text => {
    return text
        .replace('ä', 'ae')
        .replace('ö', 'oe')
        .replace('ü', 'ue')
        .replace('ß', 'ss')
        .replace(' ', '')
        .replace('-', '');
};

export const sortBy = prop => (a, b) => {
    return a[prop] < b[prop] ? -1 : 1;
};

export interface CtfRichContent {
    type: string;
    elements: CtfElement[];
    data: CtfAsset;
}

export const normalizeRichContent = (content): CtfRichContent[] => {
    if (!content || !content.content) return [];
    return content.content.map(contentGroup => ({
        type: contentGroup.nodeType,
        elements: normalizeElements(contentGroup.content),
        data: hasData(contentGroup.data) ? normalizeAssetData(contentGroup.data) : undefined
    }));
};

export interface CtfElement {
    type: string;
    value: string;
    content: CtfElement[];
    marks: string[];
}

const normalizeElements = (elements): CtfElement[] => {
    return elements.map(element => {
        return {
            type: element.nodeType,
            value: element.value || undefined,
            content: element.content ? normalizeElements(element.content) : undefined,
            marks: element.marks ? element.marks.map(m => m.type) : [],
            raw: {...element}
        } as CtfElement;
    });
};

export interface CtfAsset {
    url: string;
    caption: string;
}

const normalizeAssetData = (data): CtfAsset => {
    const asset = data.target.fields;
    return {
        url: asset.file.url,
        caption: asset.title + ' - ' + asset.description
    };
};

const hasData = data => data && Object.keys(data).length > 0;
