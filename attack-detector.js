/**
 * Copyright 2017 Ozan Pekmezci
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    var attackDetector = require('attack-detector');

    function AttackDetectorNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;

        this.on("input", function(msg) {
            if (msg.hasOwnProperty("payload")) {
                attackDetector(msg.payload, msg.overrides || null, function (err, result) {
                    msg.attackDetector = result;
                    node.send(msg);
                });
            }
            else { node.send(msg); } // If no payload - just pass it on.
        });
    }
    RED.nodes.registerType("attack-detector",AttackDetectorNode);
}
