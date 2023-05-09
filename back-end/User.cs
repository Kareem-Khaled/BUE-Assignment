using System.ComponentModel.DataAnnotations;

namespace back_end
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Invalid Name. Name must be between 3 and 20 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress(ErrorMessage = "Invalid e-mail address. Please enter a valid e-mail address in the format of name@domain.com.")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(?:\+2)?01[0125][0-9]{8}$", ErrorMessage = "Invalid phone number. Phone number should be in the format +201XXXXXXXXX.")]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [Range(1, 100, ErrorMessage = "Invalid Age, Are you sure that is your age :)")]
        public int Age { get; set; }
    }
}