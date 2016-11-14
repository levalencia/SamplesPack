
namespace IdentityTokenService.Models
{
  public static class Config
  {
    // If you get errors that the audience is valid, you will need to change this
    // value to the location of your mail app HTML file.
    public static string Audience = @"https://localhost:44312/App/Home/Home.html";
  }
}