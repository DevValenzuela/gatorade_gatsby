import React from "react";
import { PrincipalSlider } from "../paragraphs/PrincipalSlider";
import { SecondarySlider } from "../paragraphs/SecondarySlider";
import { Benefits } from "../paragraphs/Benefits";

const components = {
    paragraph__principal_slider: PrincipalSlider,
    paragraph__secondary_slider: SecondarySlider,
    paragraph__benefits: Benefits,
};

export const getParagraph = node => {
    if (components.hasOwnProperty(node.type)) {
        const ParagraphComponent = components[node.type];
        return <ParagraphComponent key={node.id} node={node} />;
    }
    return <p key={node.id}>Unknown type {node.__typename}</p>;
};
