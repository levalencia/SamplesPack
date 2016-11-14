using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AngularForMVC.Models
{
    public class EmployeeVM
    {
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        [MinLength(5)]
        public string Notes { get; set; }
        public string Department { get; set; }
        public bool PerkCar { get; set; }
        public bool PerkStock { get; set; }
        public bool PerkSixWeeks { get; set; }
        public string PayrollType { get; set; }
    }
}