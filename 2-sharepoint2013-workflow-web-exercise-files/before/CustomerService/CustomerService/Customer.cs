using System.ComponentModel.DataAnnotations;

namespace CustomerService {
  public class Customer {
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Required]
    public string FirstName { get; set; }

    [StringLength(100)]
    [Required]
    public string LastName { get; set; }

    [StringLength(200, MinimumLength = 10)]
    [Required]
    public string Email { get; set; }
  }
}