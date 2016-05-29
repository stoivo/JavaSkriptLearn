import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.io.PrintWriter;

class Brreg{
	ArrayList<String[]> enheter = new ArrayList<>();
	ArrayList<String[]> kommuner = new ArrayList<>();
	ArrayList<String[]> kemner1kommune2 = new ArrayList<>();
	String kommuneHode;

	public void lesfil() throws FileNotFoundException{
		lesfil("enhet.csv", enheter);
		lesfil("kommunerR.csv", kommuner);
	}

	public void lesfil(String filnavn, ArrayList hvor) throws FileNotFoundException{
		try {
			Scanner leser = new Scanner(new File(filnavn));
			kommuneHode = leser.nextLine();
			while(leser.hasNextLine()){
				String helegreia = leser.nextLine();
				String[] enhet;
				if(hvor == kommuner){
					enhet = helegreia.split(";", 9);
				} else{
					enhet =helegreia.split(";");

				}
				//System.out.println(helegreia);
				//System.out.println(enhet.length);

				if(hvor == kommuner){
					String nn = enhet[1];
					String ny = "";
					for(int i = 1; i <(nn.length() - 1); i++ ){
						ny+= nn.charAt(i);
					}
					enhet[1] = ny;
				}
				hvor.add(enhet);

			}

		} catch (FileNotFoundException e) {
			System.out.println("UNNTAK");
		}
	}
	public void skrivut(){
		for (int i = 0; i < kemner1kommune2.size(); i++) {
			System.out.println(i + ") " + kemner1kommune2.get(i++)[1] + " og " + kemner1kommune2.get(i)[1] );
		}
	}

	public void likhet(){
		int teller = 0;
		Scanner bruker = new Scanner(System.in);
		for (String[] firma : enheter ) {
			for( String[] kommune: kommuner){
				//System.out.println("kommune " + kommune.length);
				if(kommune[5].equals("")){
					//System.out.println("prøver"+ harlikhet(kommune[1].toLowerCase(),firma[1].toLowerCase()));
					if(harlikhet(kommune[1].toLowerCase(),firma[1].toLowerCase())){
						System.out.println(++teller + ") Skal " + firma[1] + " representere " + kommune[1] + ".								 Tast 'y' for 'yes' og alt annet for 'no'");
						String svar = bruker.nextLine();
						if(svar.equals("y")){
							kommune[5] = firma[0];
							kommune[6] = firma[1];
							kommune[7] = firma[4];
							//kemner1kommune2.add(firma);
							//kemner1kommune2.add(kommune);
						} else if(svar.equals("q")){
							return;
						}
					}
				}
			}
		}
	}

	private boolean harlikhet(String kommune, String firma){
	//	System.out.println(kommune + "_:_" + firma);
		int index = 0;
		boolean sammenhengende = false;
		for(int i = 0; i < firma.length(); i++){
			if(kommune.charAt(index) == firma.charAt(i)){
				index++;
				sammenhengende = true;
				if(index == kommune.length()){
					return true;
				}
			} else if(sammenhengende){
				sammenhengende = false;
				index = 0;
				if(kommune.charAt(index) == firma.charAt(i)){
					index++;
					sammenhengende = true;
				}
			}
		}
		return false;
	}

	public void skriv() throws FileNotFoundException{
		PrintWriter p = new PrintWriter(new File("kommuner.csv"));
		p.println(kommuneHode);
		for(String[] k: kommuner){
			for(int i = 0; i < k.length; i++){
				p.print(k[i] + ";");
				}
				p.println();
		}

		p.close();

	}







}


class Main{
	public static void main(String[] args) throws FileNotFoundException{
		Brreg b = new Brreg();
		b.lesfil();
		b.likhet();
		b.skrivut();
		b.skriv();
	}
}

