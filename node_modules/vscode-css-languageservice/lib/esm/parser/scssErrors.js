/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import * as nls from 'vscode-nls';
const localize = nls.loadMessageBundle();
export class SCSSIssueType {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }
}
export const SCSSParseError = {
    FromExpected: new SCSSIssueType('scss-fromexpected', localize('expected.from', "'from' expected")),
    ThroughOrToExpected: new SCSSIssueType('scss-throughexpected', localize('expected.through', "'through' or 'to' expected")),
    InExpected: new SCSSIssueType('scss-fromexpected', localize('expected.in', "'in' expected")),
};
