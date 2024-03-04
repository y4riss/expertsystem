const rules = {
  faulty_graphics_card: [
    "blank_screen",
    "artifacting_on_screen",
    "flickering_display",
  ],
  faulty_audio_card: ["no_sound"],
  faulty_monitor: ["blank_screen"],
  loose_display_cable: ["blank_screen", "flickering_display"],
  faulty_speakers: ["no_sound"],
  mute_setting_enabled: ["no_sound"],
  overheating: [
    "computer_freezing",
    "random_shutdowns",
    "loud_fan_noise",
    "artifacting_on_screen",
    "computer_overheating",
    "spontaneous_rebooting",
  ],
  insufficient_memory: [
    "computer_freezing",
    "slow_performance",
    "high_CPU_usage",
  ],
  faulty_hard_drive: [
    "computer_freezing",
    "random_shutdowns",
    "computer_not_booting_to_OS",
  ],
  too_many_background_processes: ["slow_performance", "high_CPU_usage"],
  disk_fragmentation: ["slow_performance"],
  faulty_memory: ["blue_screen_of_death"],
  corrupted_system_files: [
    "blue_screen_of_death",
    "random_shutdowns",
    "USB_device_not_recognized",
  ],
  driver_conflict: ["blue_screen_of_death"],
  faulty_network_adapter: ["network_connection_issues"],
  misconfigured_network_settings: ["network_connection_issues"],
  interference: ["network_connection_issues"],
  loose_keyboard_cable: ["unresponsive_keyboard"],
  driver_issues: [
    "unresponsive_keyboard",
    "artifacting_on_screen",
    "USB_device_not_recognized",
    "flickering_display",
    "spontaneous_rebooting",
  ],
  faulty_keyboard: ["unresponsive_keyboard"],
  faulty_fan: ["loud_fan_noise", "computer_overheating"],
  dusty_components: [
    "loud_fan_noise",
    "artifacting_on_screen",
    "loud_hard_drive_noise",
    "computer_overheating",
  ],
  faulty_USB_port: ["USB_device_not_recognized"],
  faulty_power_supply: ["random_shutdowns", "spontaneous_rebooting"],
  faulty_motherboard: ["computer_won't_power_on"],
  corrupted_boot_loader: ["computer_not_booting_to_OS"],
  missing_boot_files: ["computer_not_booting_to_OS"],
  printer_paper_jam: ["printer_not_printing"],
  printer_offline: ["printer_not_printing"],
  malware_infection: ["high_CPU_usage"],
  blocked_airflow: ["computer_overheating"],
  improper_drive_installation: ["loud_hard_drive_noise"],
  printer_driver_issues: ["printer_not_printing"],
  failing_hard_drive: ["loud_hard_drive_noise"],
};

// Separate objects for symptoms, issues, and relations
const symptoms = [];
const issues = [];
const issueSymptoms = [];

// Extract data from the rules object
Object.entries(rules).forEach(([issueName, symptomList]) => {
  issues.push(issueName)
  symptomList.forEach((symptom) => {
    if (!symptoms[symptom]) {
      symptoms.push(symptom);
    }
    issueSymptoms.push({ issueName, symptom });
  });
});

console.log("Symptoms:", symptoms);
console.log("Issues:", issues);
console.log("IssueSymptoms:", issueSymptoms);

module.exports = { symptoms, issues, issueSymptoms };