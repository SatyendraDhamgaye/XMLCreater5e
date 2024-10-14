document.addEventListener('DOMContentLoaded', function () {
    var classButton = document.getElementById('ClassButton');
    var spellButton = document.getElementById('SpellButton');
    var className = document.getElementById('className');
    var hitDie = document.getElementById('hd');
    var prof = document.getElementById('prof');
    var numSkill = document.getElementById('nSkills');
    var spellAbility = document.getElementById('spellAbility');








    var classDestinationTextarea = document.getElementById('classXmlOutput');
    var spellDestinationTextarea = document.getElementById('spellXmlOutput');

    classButton.addEventListener('click', function () {
        var finalContent = "<name>" + className.value + "</name>\n<hd>" + hitDie.value + "</hd>\n<proficiency>" + prof.value + "</proficiency>\n<numSkills>" + numSkill.value + "</numSkills>\n<spellAbility>" + spellAbility.value + "</spellAbility>";


        classDestinationTextarea.value = finalContent;
    });  
});











function generateSpellXML() {
    // Get the repetition count from user input
    var repeatCount = 20;

    // Create a string to store XML content
    var xmlContent = '';

    // Generate XML structure based on repetition count
    for (var i = 1; i <= repeatCount; i++) {
        // Prompt the user for slots data for the current level
        var slotsData = prompt("Enter slots data for level " + i);

        // Validate if the user provided slots data
        if (slotsData !== null && slotsData.trim() !== "") {
            // Construct the XML structure for the current level
            xmlContent += `<autolevel level="${i}">
                <slots>${slotsData}</slots>
            </autolevel>\n`;
        } else {
            // If no slots data provided, skip this level
            alert("Skipping level " + i + " due to empty input.");
        }
    }

    // Display the generated XML content in the textarea
    document.getElementById("xmlOutput").value = xmlContent;
}



function generateLevelXML() {
    // Get the repetition count from user input
    var repeatCount = document.getElementById("repeatLevelInput").value;

    // Create a string to store XML content
    var xmlContent = '';

    // Generate XML structure based on repetition count
    for (var i = 1; i <= repeatCount; i++) {
        // Prompt the user for level, name, and text for the feature
        var level = prompt("Enter level for feature " + i);
        var name = prompt("Enter name for feature " + i);
        var text = prompt("Enter text for feature " + i);

        // Validate if the user provided level, name, and text
        if (level !== null && name !== null && text !== null &&
            level.trim() !== "" && name.trim() !== "" && text.trim() !== "") {
            // Convert special characters to HTML entities
            text = text.replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/>/g, '&gt;')
                       .replace(/"/g, '&quot;')
                       .replace(/'/g, '&#39;')
                       .replace(/\n/g, '&#10;')
                       .replace(/\r/g, '&#13;')
                       .replace(/\t/g, '&#9;');

            // Construct the XML structure for the feature
            xmlContent += `<autolevel level="${level}">
                <feature>
                    <name>${name}</name>
                    <text>${text}</text>
                </feature>
            </autolevel>\n`;
        } else {
            // If any input is empty, alert the user and skip this feature
            alert("Skipping feature " + i + " due to empty input.");
        }
    }

    // Display the generated XML content in the textarea
    document.getElementById("xmlLevelOutput").value = xmlContent;
}

























function generateFinalXML() {
    // Get data from the textareas
    var textarea1Data = document.getElementById("classXmlOutput").value;
    var textarea2Data = document.getElementById("xmlOutput").value;
    var textarea3Data = document.getElementById("xmlLevelOutput").value;

       // Combine data with new lines and tabs
    var combinedData = `
<?xml version='1.0' encoding='utf-8'?>
<compendium version="5" auto_indent="NO">
    <class>
    ${textarea1Data}
    ${textarea2Data}
    ${textarea3Data}
    </class>
  </compendium>`;

    // Create a blob from the combined data
    var blob = new Blob([combinedData], { type: 'text/xml' });

    // Create a temporary URL for the blob
    var url = URL.createObjectURL(blob);

    // Create a link element to download the XML file
    var downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'generated.xml';

    // Append the link to the body and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
}