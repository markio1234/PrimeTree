package BackendServer.Exceptions;

/**This Exception is thrown , if someone tries to access Userdata from a user, that doesn't exist in the userdb.
 * @author Florian Kutz
 *
 */
public class UserNotFoundException extends Exception {
	
	public UserNotFoundException(String string) {
		super(string);
	}

}
